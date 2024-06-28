import * as React from 'react';

interface ArrowRightProps extends React.SVGProps<SVGSVGElement> {}

export const ArrowRight: React.FC<ArrowRightProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path
      fill={props.fill || '#4338CA'}
      d='m13.476 9.167-4.47-4.47 1.179-1.179L16.667 10l-6.482 6.482-1.179-1.179 4.47-4.47H3.333V9.167h10.143Z'
    />
  </svg>
);
