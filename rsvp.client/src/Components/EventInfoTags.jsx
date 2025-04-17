import React from "react";

const EventInfoTags = ({ Icon, title }) => {
  return (
    <span className="flex items-center justify-center gap-x-2 px-[0.6rem] py-[0.4rem] border-2 border-[#0897FF] text-[#0897FF] bg-[#0897ff1c] rounded-md text-sm w-fit">
      {Icon && <Icon className="text-base" />}
      <p>{title}</p>
    </span>
  );
};

export default EventInfoTags;
