import React from "react";

export const FileUploadSvg = () => {
  return (
    <svg
      className={"upload-file-svg"}
      fill={"none"}
      viewBox={"0 0 24 24"}
      stroke={"currentColor"}
      aria-hidden={"true"}
    >
      <path
        vectorEffect={"non-scaling-stroke"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={"M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"}
      />
    </svg>
  );
};

export const Tag = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path
          d={"M18.201 15.556l-2.645 2.645c-.686.687-1.132 1.13-1.503 1.412-.348.266-.51.295-.618.295-.108 0-.27-.03-.618-.295-.371-.283-.817-.725-1.503-1.412L5.962 12.85c-.645-.645-.755-.78-.813-.923-.059-.143-.075-.317-.066-1.23L5.11 8.08c.01-.953.019-1.568.084-2.021.06-.425.154-.56.23-.635.075-.075.209-.168.634-.23.453-.064 1.068-.073 2.021-.083l2.618-.027c.912-.01 1.085.007 1.229.066.143.058.278.168.923.813l5.352 5.352c.687.687 1.13 1.132 1.412 1.503.266.348.295.51.295.618 0 .108-.03.27-.295.618-.283.371-.725.817-1.412 1.503z"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
        />
        <path d={"M9.65 8.237A1 1 0 1 1 8.237 9.65a1 1 0 0 1 1.415-1.414z"} fill={"currentColor"} />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Close = () => {
  return (
    <svg
      width={"18"}
      height={"18"}
      fill={"none"}
    >
      <g>
        <path
          d={"M4 4l10 10m0-10L4 14"}
          stroke={"currentColor"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H18V18H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Check = () => {
  return (
    <svg
      width={"18"}
      height={"18"}
      fill={"none"}
    >
      <g>
        <path
          d={"M3 11l2.2 2.933c.367.49.55.734.8.734s.433-.245.8-.734L15 3"}
          stroke={"currentColor"}
          strokeLinecap={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H18V18H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TextOnImage = () => {
  return (
    <svg
      fill={"none"}
      height={"24"}
      width={"24"}
    >
      <g
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
      >
        <rect
          height={"18"}
          rx={"2"}
          width={"18"}
          x={"3"}
          y={"3"}
        />
        <path d={"M3 7h18M7 11.5h10M7 16h6"} />
      </g>
    </svg>
  );
};

export const Crop = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g stroke={"currentColor"} strokeWidth={"2"}>
        <path d={"M9 11H7c-1.886 0-2.828 0-3.414.586C3 12.172 3 13.114 3 15v2c0 1.886 0 2.828.586 3.414C4.172 21 5.114 21 7 21h2c1.886 0 2.828 0 3.414-.586C13 19.828 13 18.886 13 17v-2c0-1.886 0-2.828-.586-3.414C11.828 11 10.886 11 9 11z"} />
        <path
          d={"M5.5 7.5V7c0-1.886 0-2.828.586-3.414C6.672 3 7.614 3 9.5 3h.5m11 4.5V7c0-1.886 0-2.828-.586-3.414C19.828 3 18.886 3 17 3h-.5M21 14v.5c0 1.886 0 2.828-.586 3.414-.586.586-1.528.586-3.414.586h-.5"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Flip = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path
          d={"M5 7h14m0 0l-3.5 4M19 7l-3.5-4M19 17H5m0 0l3.5 4M5 17l3.5-4"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FlipHorizontal = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path
          d={"M8.875 7L6.723 9.208c-1.287 1.319-1.93 1.978-1.93 2.792 0 .814.643 1.473 1.93 2.792L8.875 17m6.25-10l2.152 2.208c1.287 1.319 1.93 1.978 1.93 2.792 0 .814-.643 1.473-1.93 2.792L15.125 17"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FlipVertical = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <g>
          <path
            d={"M17 8.875l-2.208-2.152c-1.319-1.287-1.978-1.93-2.792-1.93-.814 0-1.473.643-2.792 1.93L7 8.875m10 6.25l-2.208 2.152c-1.319 1.287-1.978 1.93-2.792 1.93-.814 0-1.473-.643-2.792-1.93L7 15.125"}
            stroke={"currentColor"}
            strokeWidth={"2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />
        </g>
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
        <clipPath>
          <path
            fill={"currentColor"}
            transform={"rotate(90 12 12)"}
            d={"M0 0H24V24H0z"}
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Pen = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path d={"M10.293 12.293a1 1 0 1 0 1.414 1.414l-1.414-1.414zm8.414-5.586L19.414 6 18 4.586l-.707.707 1.414 1.414zm.586-3.414L18.586 4 20 5.414l.707-.707-1.414-1.414zm2.414.414a1 1 0 0 0-1.414-1.414l1.414 1.414zm-10 10l7-7-1.414-1.414-7 7 1.414 1.414zm9-9l1-1-1.414-1.414-1 1 1.414 1.414z"} fill={"currentColor"} />
        <path
          d={"M10 7H7c-1.886 0-2.828 0-3.414.586C3 8.172 3 9.114 3 11v6c0 1.886 0 2.828.586 3.414C4.172 21 5.114 21 7 21h6c1.886 0 2.828 0 3.414-.586C17 19.828 17 18.886 17 17v-3"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Save = () => {
  return (
    <svg
      width={"24"}
      height={"21"}
      fill={"none"}
    >
      <g>
        <path
          d={"M6 7v8.222c0 3.46 0 5.19.989 5.55.989.358 2.097-.971 4.314-3.628l.697-.835.697.835c2.217 2.657 3.325 3.986 4.314 3.627.989-.358.989-2.089.989-5.55V7c0-1.886 0-2.828-.586-3.414C16.828 3 15.886 3 14 3h-4c-1.886 0-2.828 0-3.414.586C6 4.172 6 5.114 6 7z"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Clear = () => {
  return (
    <svg
      width={"24"}
      height={"21"}
      fill={"none"}
    >
      <g>
        <g>
          <path
            d={"M4.122 13.286c0 4.26 2.96 7.714 7.378 7.714s8-3.058 8-7.714c0-4.656-3.582-7.715-8-7.715h-7m0 0L7.167 3M4.5 5.571l2.667 2.572"}
            stroke={"currentColor"}
            strokeWidth={"2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />
        </g>
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
        <clipPath>
          <path
            fill={"currentColor"}
            transform={"matrix(-1 0 0 1 24 0)"}
            d={"M0 0H24V24H0z"}
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const More = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path d={"M6 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"} fill={"currentColor"} />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Blur = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g stroke={"currentColor"} strokeWidth={"2"}>
        <path d={"M22 12c0 2.418-5 7-10 7S2 14.418 2 12s5-7 10-7 10 4.582 10 7z"} />
        <circle
          cx={"12"}
          cy={"12"}
          r={"3"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Zoom = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
      >
        <circle
          cx={"9.375"}
          cy={"9.375"}
          r={"6.375"}
        />
        <path d={"M14.333 14.333L20 20"} />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Rotate = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path
          d={"M19.878 13.286c0 4.26-2.96 7.714-7.378 7.714s-8-3.058-8-7.714c0-4.656 3.582-7.715 8-7.715h7m0 0L16.833 3M19.5 5.571l-2.667 2.572"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Brightness = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <circle
        cx={"12"}
        cy={"12"}
        r={"4"}
        stroke={"currentColor"}
        strokeWidth={"2"}
      />
      <path
        d={"M12 4.5V3m0 18v-1.5M4.5 12H3m18 0h-1.5m-1-6.5l-1 1m-11 11l-1 1m12-1l1 1m-12-12l-1-1"}
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
      />
    </svg>
  );
};

export const Tornado = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <path
        d={"M11.565 10.923C-.283 11.834.747 4.417 11.05 3.174c10.302-1.243 11.333 4.558 8.757 5.014"}
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
      />
      <path
        d={"M16 8c-.646-.969-4.419-1.103-7.146 0M12 21c3-1.5 2.342-3.154.5-3-6 .5 5.601-4.9 2-4-3.321.83-6.536.983-7.88-.5"}
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
      />
    </svg>
  );
};

export const ShowTags = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path
          d={"M12 12.5h3c1.892 0 2.838 0 3.394-1.095.556-1.094.176-1.614-.584-2.654C16.552 7.031 14.42 6 12 6m0 6.5H9.5m2.5 0h2.5c0 1.5 0 3-2.5 3s-2.5-1.5-2.5-3M12 6C9.58 6 7.448 7.032 6.19 8.751c-.76 1.04-1.14 1.56-.584 2.654C6.162 12.5 7.108 12.5 9 12.5h.5M12 6V3M6.5 20L8 18m4 3v-2m5.5 1L16 18"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HideTags = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path
          d={"M12 12.5h3c1.892 0 2.838 0 3.394-1.095.556-1.094.176-1.614-.584-2.654C16.552 7.031 14.42 6 12 6m0 6.5H9.5m2.5 0h2.5c0 1.5 0 3-2.5 3s-2.5-1.5-2.5-3M12 6C9.58 6 7.448 7.032 6.19 8.751c-.76 1.04-1.14 1.56-.584 2.654C6.162 12.5 7.108 12.5 9 12.5h.5M12 6V3"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ScreenShot = () => {
  return (
    <svg
      width={"24"}
      height={"24"}
      fill={"none"}
    >
      <g>
        <path
          d={"M3 10.238c0-1.282 0-1.923.283-2.397a2 2 0 0 1 .691-.691c.474-.283 1.115-.283 2.397-.283h.639c.08 0 .12 0 .158-.002a2 2 0 0 0 1.618-.932l.09-.13a2 2 0 0 1 1.528-.802L10.562 5h2.876l.158.001a2 2 0 0 1 1.527.803c.023.03.046.063.091.13l.091.129a2 2 0 0 0 1.685.804h.639c1.282 0 1.923 0 2.397.283.284.17.521.407.69.691.284.474.284 1.115.284 2.397V15c0 1.886 0 2.828-.586 3.414C19.828 19 18.886 19 17 19H7c-1.886 0-2.828 0-3.414-.586C3 17.828 3 16.886 3 15v-4.762z"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
        />
        <path
          d={"M15.143 12.571a3.143 3.143 0 1 1-6.286 0 3.143 3.143 0 0 1 6.286 0z"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
        />
        <path d={"M16.571 10a.571.571 0 1 1 1.143 0 .571.571 0 1 1-1.143 0z"} fill={"currentColor"} />
      </g>
      <defs>
        <clipPath>
          <path fill={"currentColor"} d={"M0 0H24V24H0z"} />
        </clipPath>
      </defs>
    </svg>
  );
};