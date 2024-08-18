import IOPS from "@/components/IOPS";
import Throughput from "@/components/Throughput";

export default function Home() {
  return (
    <div className="flex-1 p-[5px]">
      <div className="flex justify-between items-center mb-6 pt-4">
        <h2 className="text-2xl font-semibold text-[#F3F4F4]">Performance Metrics</h2>
        <div className="relative">
          <button className="bg-[#1C2936] px-4 py-2 rounded-md flex items-center">
            Last 7 days
            <i className="fa-solid fa-chevron-down ml-2"></i>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-lg">
        <IOPS />
        <Throughput />
      </div>
    </div>
  );
}
