import PolicyForm, { Policy } from "./form";

const POLICY_ID = "1";

export default async function Snapshots() {
  const policy: Policy = await fetch(
    `${process.env.API_URL}/snapshots/${POLICY_ID}`
  ).then((res) => res.json());

  return (
    <div className="flex-1 p-[5px]">
      <div className="flex justify-between items-center mb-6 pt-4">
        <h2 className="text-2xl font-semibold text-[#F3F4F4]">
          Edit Snapshot Policy
        </h2>
      </div>
      <PolicyForm id={POLICY_ID} policy={policy} />
    </div>
  );
}
