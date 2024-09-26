import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

type Tab = {
  value: string;
  title?: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
};

type Props = {
  title?: ReactNode;
  items: Tab[];
  className?: string;
  titleClassName?: string;
  defaultValue?: string;
  dividerBetweenContentAndTabs?: boolean;
  onChangeTab?: (tab: string) => void;
};

export default function CTabs({
  defaultValue,
  title,
  items,
  className,
  titleClassName,
  dividerBetweenContentAndTabs = false,
  onChangeTab,
}: Props) {
  let clss = "w-full flex flex-col";

  if (dividerBetweenContentAndTabs) clss += ` gap-y-4`;
  if (className) clss += ` ${className}`;

  const handleChangeTab = (value: string) => {
    if (onChangeTab) onChangeTab(value);
  };

  return (
    <Tabs
      defaultValue={defaultValue}
      className={clss}
      onValueChange={handleChangeTab}
    >
      <div className='tab-holder flex flex-row items-center justify-between'>
        <TabsList className='flex flex-row justify-start bg-black/5'>
          {items.map((x) => (
            <TabsTrigger value={x.value} key={x.value}>
              {x.icon ? x.icon : x.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {!!title && typeof title === "string" ? (
          <strong className={titleClassName ?? ""}>{title}</strong>
        ) : (
          title
        )}
      </div>
      {!!dividerBetweenContentAndTabs && <hr />}
      {items.map((x) => (
        <TabsContent value={x.value} key={x.value} className='tab-content'>
          {x.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
