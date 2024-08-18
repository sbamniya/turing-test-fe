import React from "react";

const Widget: React.FC<
  React.PropsWithChildren<{
    title: React.ReactNode;
    read: React.ReactNode;
    write: React.ReactNode;
  }>
> = ({ title, read, write, children }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-6 text-[#C7CACC]">{title}</h3>
      <div className="grid grid-cols-6 gap-4">
        <div id="iopsChart" className="h-48 col-span-5">
          {children}
        </div>
        <div className="flex align-center justify-center gap-4 flex-col col-span-1">
          <div>
            <div className="text-[#A6AAAE]">{title}</div>
            <div className="bg-[#222C36] border border-[#333B44] text-[16px] p-4">
              <div className="text-[#A6AAAE]">Read</div>
              {read}
            </div>
            <div className="bg-[#222C36] border border-[#333B44] text-[16px] p-4">
              <div className="text-[#A6AAAE]">Write</div>
              <div className="text-[#00A3CA]">{write}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
