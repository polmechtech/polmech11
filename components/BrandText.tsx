import { Fragment } from "react";

const BRAND = "POLMECH.TECH";

export function BrandName() {
  return <><span className="text-white">POLMECH</span><span className="text-red-500">.TECH</span></>;
}

export default function BrandText({ text }: { text: string }) {
  return <>{text.split(BRAND).map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <BrandName />}
      {part}
    </Fragment>
  ))}</>;
}
