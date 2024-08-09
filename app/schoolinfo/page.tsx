// dashborad.page.tsx
"use client";
import { useToggle } from "@/components/context/ToggleContext";
import Link from "next/link";
import { ReactNode, useState } from "react";
import SchoolInfo from "@/components/cardSchoolInfo/SchoolInfo";
import BudgetBalances from "@/components/cardSchoolInfo/BudgetBalances";
import { usePathname } from "next/navigation";

// تعريف المكونات الممكنة
const ComponentA = () => (
  <div className="p-6 rounded-lg  max-w-4xl mx-auto   text-gray-800 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      مرحبا بك في تطبيقنا
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300">
      يهدف تطبيقنا إلى تسهيل تسيير المصالح الاقتصادية للمؤسسات التربوية من خلال
      تقديم أدوات وتقارير متكاملة تدعم الإدارة المالية الفعالة. سواء كنت مديراً
      لمؤسسة تربوية أو مسؤولاً عن الشؤون المالية، يوفر لك تطبيقنا واجهة استخدام
      بسيطة وفعالة لإدارة الميزانيات، وتتبع النفقات، وتخطيط الاستراتيجيات
      المالية بما يتماشى مع احتياجات مؤسستك.
    </p>
  </div>
);

type Data = {
  id: number;
  title: string;
  component: ReactNode;
};
const dataNav: Data[] = [
  {
    id: 0,
    title: "معلومات المؤسسة ",
    component: <SchoolInfo />,
  },
  {
    id: 1,
    title: "أرصدة الميزانية",
    component: <BudgetBalances />,
  },
  {
    id: 2,
    title: "أرصدة خارج الميزانية",
    component: <ComponentA />,
  },
  {
    id: 3,
    title: "الأبواب",
    component: <ComponentA />,
  },
  {
    id: 4,
    title: "بنود المداخيل",
    component: <ComponentA />,
  },
  {
    id: 5,
    title: "بنود المصاريف",
    component: <ComponentA />,
  },
  {
    id: 6,
    title: "الأوراق الثبوتية",
    component: <ComponentA />,
  },
];

const DisplayComponent = ({ component }: { component: React.ReactNode }) => {
  return <div>{component}</div>;
};
const Page = () => {
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(
    <ComponentA />
  );
  const { toggle } = useToggle();
  const pathname = usePathname();
  return (
    <div
      className={` transition-all duration-300 ${
        toggle ? "ml-[250px]" : "ml-[50px]"
      } flex flex-col justify-center items-center     p-4  dark:text-white`}
      dir="rtl"
    >
      {/* <DisplayComponent component={currentComponent} /> */}
      <div className="grid md:grid-cols-3 sm:grid-cols-1   p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 xs:max-w-full sm:min-w-full h-full">
        <div
          className="md:border-l-2 md:border-b-0 sm:border-b-2 border-black/40 dark:border-gray-500 py-5  px-2 space-y-1  "
          dir="rtl"
        >
          {dataNav.map((link) => {
            return (
              <div key={link.id}>
                {link.component === currentComponent ? (
                  <button
                    onClick={() => {
                      setCurrentComponent(link.component);
                    }}
                    key={link.id}
                    className={`w-full  dark:text-[#3399ff] text-[#3399ff] hover:text-[#077bff] dark:hover:text-[#3399ff] text-[15px] flex gap-2 items-center justify-between bg-gray-100 dark:bg-gray-600 rounded px-2 py-3 transition-all`}
                  >
                    <span className="text-xl">{link.title}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentComponent(link.component);
                    }}
                    key={link.id}
                    className={`w-full text-[#333] dark:text-white hover:text-[#077bff] dark:hover:text-[#3399ff] text-[15px] flex gap-2 items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 rounded px-2 py-3 transition-all`}
                  >
                    <span className="text-xl">{link.title}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="col-span-2  px-2 py-7">
          <DisplayComponent component={currentComponent} />
        </div>
      </div>
    </div>
  );
};

export default Page;
