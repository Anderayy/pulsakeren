import { dashboardMenu } from "@/lib/data";
import { DashboardShell } from "@/components/dashboard-shell";

type PageProps = {
  params: Promise<{ section: string }>;
};

export default async function DashboardSectionPage({ params }: PageProps) {
  const { section } = await params;
  const item = dashboardMenu.find((menu) => String(menu[1]).endsWith(section));
  return <DashboardShell section={item ? String(item[0]) : section.replaceAll("-", " ")} />;
}
