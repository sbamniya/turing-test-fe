import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavItem: React.FC<{
  title: React.ReactNode;
  active?: boolean;
  link: string;
}> = ({ title, active, link }) => (
  <Link href={link}>
    <span
      className={`flex gap-2 items-center p-2 cursor-pointer ${
        active
          ? "border-r-2 bg-[#13181E] border-[#00A3CA]"
          : "hover:border-r-2 hover:bg-[#13181E] hover:border-[#00A3CA]"
      }`}
    >
      <Image src="/circle.svg" alt="circle" width={5} height={5} />
      <span>{title}</span>
    </span>
  </Link>
);

const Sidebar: React.FC<{ pathname: string }> = ({
  pathname
}) => {
  return (
    <div className="bg-[#283038] w-[250px] flex flex-col justify-between">
      <div>
        <div className="flex items-center text-xl font-semibold py-4 px-6">
          <i className="fa-solid fa-diagram-project text-[#00B3FF] mr-3"></i>
          <span>[Cluster Name]</span>
        </div>
        <nav className="mt-4 pl-2">
          <div className="flex flex-col gap-2">
            <NavItem
              title="Performance Metrics"
              active={pathname === "/"}
              link="/"
            />
            <NavItem
              title="Edit Snapshot Policy"
              link="/snapshots"
              active={pathname?.startsWith("/snapshots")}
            />
          </div>
        </nav>
      </div>
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#1C2936]">
        <i className="fa-solid fa-user-circle text-xl"></i>
        <span>AD\user</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default Sidebar;

/**
 * <div className="bg-[#283038] w-[250px] flex flex-col justify-between">
              <div>
                <div className="flex items-center text-xl font-semibold py-4 px-6">
                  <i className="fa-solid fa-diagram-project text-[#00B3FF] mr-3"></i>
                  <span>[Cluster Name]</span>
                </div>
                <nav className="mt-4">
                  <ul>
                    <li className="flex items-center px-6 py-3 bg-[#121B25] text-[#00B3FF]">
                      <i className="fa-solid fa-chart-line mr-2"></i>
                      <span>Performance Metrics</span>
                    </li>
                    <li className="flex items-center px-6 py-3 hover:bg-[#1C2936]">
                      <i className="fa-solid fa-file-lines mr-2"></i>
                      <span>Edit Snapshot Policy</span>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#1C2936]">
                <i className="fa-solid fa-user-circle text-xl"></i>
                <span>AD\user</span>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
 */
