import CotopiaButton from "@/components/shared-ui/c-button";

export default function CreateWorkspace() {
  return (
    <div className='grid grid-cols-12 items-start w-full gap-4'>
      <div className='col-span-12 md:col-span-6'>
        <CotopiaButton
          className='text-lg text-white w-full'
          variant={"default"}
          size={"lg"}
        >
          Create Workspace
        </CotopiaButton>
      </div>
      <div className='col-span-12 md:col-span-6'>
        <span className='text-sm text-gray-500'>
          Create a collaborative workspace and invite your team members to join.
        </span>
      </div>
    </div>
  );
}
