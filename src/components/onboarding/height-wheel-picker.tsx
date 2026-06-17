"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const MIN_CM = 120;
const MAX_CM = 230;
const ITEM_HEIGHT = 52;
const WHEEL_VISIBLE_COUNT = 5;

function feetInchesToCm(feet: number, inches: number) {
  return Math.round((feet * 12 + inches) * 2.54);
}

function formatFtInLabel(feet: number, inches: number) {
  return `${feet}'${inches}"`;
}

const CM_OPTIONS = Array.from(
  { length: MAX_CM - MIN_CM + 1 },
  (_, index) => MIN_CM + index,
);

const FT_IN_OPTIONS = (() => {
  const options: { cm: number; label: string }[] = [];
  for (let feet = 3; feet <= 7; feet += 1) {
    for (let inches = 0; inches <= 11; inches += 1) {
      const cm = feetInchesToCm(feet, inches);
      if (cm >= MIN_CM && cm <= MAX_CM) {
        options.push({ cm, label: formatFtInLabel(feet, inches) });
      }
    }
  }
  return options;
})();

type HeightWheelPickerProps = {
  heightCm: number;
  isHeightFeet: boolean;
  onHeightCmChange: (heightCm: number) => void;
  onUnitChange: (isHeightFeet: boolean) => void;
  onUserInteract?: () => void;
};

function clampIndex(index: number, length: number) {
  return Math.max(0, Math.min(length - 1, index));
}

function findCmIndex(heightCm: number) {
  const clamped = Math.max(MIN_CM, Math.min(MAX_CM, heightCm));
  return clamped - MIN_CM;
}

function findFtInIndex(heightCm: number) {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  FT_IN_OPTIONS.forEach((option, index) => {
    const distance = Math.abs(option.cm - heightCm);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

type WheelColumnProps = {
  labels: string[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  onUserInteract?: () => void;
};

function WheelColumn({
  labels,
  selectedIndex,
  onIndexChange,
  onUserInteract,
}: WheelColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const hasUserScrolledRef = useRef(false);
  const [scrollOffset, setScrollOffset] = useState(selectedIndex * ITEM_HEIGHT);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const wheelHeight = ITEM_HEIGHT * WHEEL_VISIBLE_COUNT;
  const edgePadding = (wheelHeight - ITEM_HEIGHT) / 2;

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior) => {
    const element = scrollRef.current;
    if (!element) return;

    isProgrammaticScrollRef.current = true;
    element.scrollTo({ top: index * ITEM_HEIGHT, behavior });
    window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, behavior === "smooth" ? 320 : 0);
  }, []);

  useLayoutEffect(() => {
    scrollToIndex(selectedIndex, "auto");
    setScrollOffset(selectedIndex * ITEM_HEIGHT);
    setActiveIndex(selectedIndex);
  }, [scrollToIndex, selectedIndex, labels.length]);

  const settleSelection = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const nextIndex = clampIndex(
      Math.round(element.scrollTop / ITEM_HEIGHT),
      labels.length,
    );

    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }

    scrollToIndex(nextIndex, "smooth");
    onIndexChange(nextIndex);
    if (hasUserScrolledRef.current && !isProgrammaticScrollRef.current) {
      onUserInteract?.();
    }
  }, [activeIndex, labels.length, onIndexChange, onUserInteract, scrollToIndex]);

  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    if (!isProgrammaticScrollRef.current) {
      hasUserScrolledRef.current = true;
    }

    const offset = element.scrollTop;
    setScrollOffset(offset);
    setActiveIndex(
      clampIndex(Math.round(offset / ITEM_HEIGHT), labels.length),
    );

    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      if (!isProgrammaticScrollRef.current) {
        settleSelection();
      }
    }, 90);
  }, [labels.length, settleSelection]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScrollEnd = () => {
      if (!isProgrammaticScrollRef.current) {
        settleSelection();
      }
    };

    element.addEventListener("scrollend", handleScrollEnd);
    return () => {
      element.removeEventListener("scrollend", handleScrollEnd);
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [settleSelection]);

  const stepBy = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = clampIndex(activeIndex + direction, labels.length);
      if (nextIndex === activeIndex) return;

      setActiveIndex(nextIndex);
      setScrollOffset(nextIndex * ITEM_HEIGHT);
      scrollToIndex(nextIndex, "smooth");
      onIndexChange(nextIndex);
      onUserInteract?.();
    },
    [activeIndex, labels.length, onIndexChange, onUserInteract, scrollToIndex],
  );

  const selectIndex = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index, labels.length);
      hasUserScrolledRef.current = true;
      setActiveIndex(nextIndex);
      setScrollOffset(nextIndex * ITEM_HEIGHT);
      scrollToIndex(nextIndex, "smooth");
      onIndexChange(nextIndex);
      onUserInteract?.();
    },
    [labels.length, onIndexChange, onUserInteract, scrollToIndex],
  );

  const canStepUp = activeIndex < labels.length - 1;
  const canStepDown = activeIndex > 0;

  return (
    <div className="height-wheel-wrap">
      <button
        type="button"
        className="height-wheel__arrow height-wheel__arrow--up"
        onClick={() => stepBy(1)}
        disabled={!canStepUp}
        aria-label="Increase height"
      >
        <i className="ri-arrow-up-s-line" aria-hidden />
      </button>

      <div
        className="height-wheel"
        style={{ height: wheelHeight }}
      >
      <div className="height-wheel__selection" aria-hidden />
      <div className="height-wheel__fade height-wheel__fade--top" aria-hidden />
      <div className="height-wheel__fade height-wheel__fade--bottom" aria-hidden />

      <div
        ref={scrollRef}
        className="height-wheel__scroll"
        onScroll={handleScroll}
        role="listbox"
        aria-activedescendant={`height-wheel-item-${activeIndex}`}
      >
        <div
          className="height-wheel__track"
          style={{
            paddingTop: edgePadding,
            paddingBottom: edgePadding,
          }}
        >
          {labels.map((label, index) => {
            const itemCenter =
              edgePadding + index * ITEM_HEIGHT + ITEM_HEIGHT / 2;
            const viewportCenter = scrollOffset + wheelHeight / 2;
            const distance = Math.abs(itemCenter - viewportCenter);
            const proximity = Math.max(0, 1 - distance / (ITEM_HEIGHT * 2.2));
            const isSelected = index === activeIndex;

            return (
              <button
                key={`${label}-${index}`}
                id={`height-wheel-item-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`height-wheel__item${isSelected ? " is-selected" : ""}`}
                style={{
                  height: ITEM_HEIGHT,
                  opacity: 0.22 + proximity * 0.78,
                  transform: `scale(${0.86 + proximity * 0.14})`,
                }}
                onClick={() => selectIndex(index)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      </div>

      <button
        type="button"
        className="height-wheel__arrow height-wheel__arrow--down"
        onClick={() => stepBy(-1)}
        disabled={!canStepDown}
        aria-label="Decrease height"
      >
        <i className="ri-arrow-down-s-line" aria-hidden />
      </button>
    </div>
  );
}

export function HeightWheelPicker({
  heightCm,
  isHeightFeet,
  onHeightCmChange,
  onUnitChange,
  onUserInteract,
}: HeightWheelPickerProps) {
  const cmLabels = useMemo(
    () => CM_OPTIONS.map((value) => `${value} cm`),
    [],
  );

  const ftInLabels = useMemo(
    () => FT_IN_OPTIONS.map((option) => option.label),
    [],
  );

  const selectedIndex = isHeightFeet
    ? findFtInIndex(heightCm)
    : findCmIndex(heightCm);

  const handleIndexChange = useCallback(
    (index: number) => {
      if (isHeightFeet) {
        onHeightCmChange(FT_IN_OPTIONS[index]?.cm ?? heightCm);
        return;
      }
      onHeightCmChange(CM_OPTIONS[index] ?? heightCm);
    },
    [heightCm, isHeightFeet, onHeightCmChange],
  );

  return (
    <div className="height-step">
      <div className="height-step__toolbar">
        <p className="onboarding-desc height-step__desc">
          Used for better match suggestions.
        </p>
        <div className="onboarding-unit-toggle height-step__toggle" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={!isHeightFeet}
            className={!isHeightFeet ? "is-active" : ""}
            onClick={() => onUnitChange(false)}
          >
            cm
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isHeightFeet}
            className={isHeightFeet ? "is-active" : ""}
            onClick={() => onUnitChange(true)}
          >
            ft / in
          </button>
        </div>
      </div>

      <WheelColumn
        key={isHeightFeet ? "ft-in" : "cm"}
        labels={isHeightFeet ? ftInLabels : cmLabels}
        selectedIndex={selectedIndex}
        onIndexChange={handleIndexChange}
        onUserInteract={onUserInteract}
      />
    </div>
  );
}
