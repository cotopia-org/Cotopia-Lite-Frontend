import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

type Tab = {
  value: string;
  title: string;
  content: ReactNode;
};

type Props = {
  title?: string;
  items: Tab[];
  className?: string;
  titleClassName?: string;
  defaultValue?: string;
  dividerBetweenContentAndTabs?: boolean;
};

export default function CTabs({
  defaultValue,
  title,
  items,
  className,
  titleClassName,
  dividerBetweenContentAndTabs = false,
}: Props) {
  let clss = "w-full flex flex-col";

  if (dividerBetweenContentAndTabs) clss += ` gap-y-4`;
  if (className) clss += ` ${className}`;

  return (
    <Tabs defaultValue={defaultValue} className={clss}>
      <div className='flex flex-row items-center justify-between'>
        {!!title && <strong className={titleClassName ?? ""}>{title}</strong>}
        <TabsList className='flex flex-row justify-start bg-black/5'>
          {items.map((x) => (
            <TabsTrigger value={x.value} key={x.value}>
              {x.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {!!dividerBetweenContentAndTabs && <hr />}
      {items.map((x) => (
        <TabsContent value={x.value} key={x.value}>
          {x.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
