import { useAppSelector } from "@/store/redux/store";

const useSetting = () => {
  const setting = useAppSelector((store) => store.settingSlice);

  return setting;
};

export default useSetting;
