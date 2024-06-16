import CotopiaButton from "@/components/shared-ui/c-button";

export default function CreateWorkspace() {
  return (
    <div className='xs:grid xs:grid-cols-12 items-start gap-x-4 w-full'>
      <div className='col-span-6'>
        <CotopiaButton
          className='w-auto 2xs:w-full text-lg text-white h-12'
          variant={"default"}
          size={"lg"}
        >
          Create Workspace
        </CotopiaButton>
      </div>

      <div className='2xs:w-full col-span-6'>
        <span className='text-sm  text-gray-500'>
          Create a collaborative workspace and invite your team members to join.
        </span>
      </div>
    </div>
  );
}