import { useEffect } from "react";
import { authApi } from "../../api/auth.api";

function Test() {
  useEffect(() => {
    const test = async () => {
      try {
        const result = await authApi.testConnect();
        console.log("✅ Связь с бэкендом работает:", result);
      } catch (error) {
        console.log("❌ Ошибка связи с бэкендом:", error);
      }
    };

    test();
  }, []);

  return <div>Проверка с беком связи</div>;
}

export default Test;
