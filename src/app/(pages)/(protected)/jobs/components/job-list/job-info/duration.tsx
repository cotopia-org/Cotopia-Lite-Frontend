import { Clock } from "lucide-react";
import Badge from "../../badge";

function Duration() {
  const formattedTime = "02:23:12";

  return (
    <Badge
      title={formattedTime}
      icon={<Clock size={16} color="#0040E0" />}
      className="bg-blue-50 text-blue-600"
    />
  );
}

export default Duration;
