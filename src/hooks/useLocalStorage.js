import { useEffect } from "react";
import { saveProgressBatch } from "../services/puzzleService";

export default function useOfflineSync(queue) {

  useEffect(() => {

    if (queue.length > 0) {

      saveProgressBatch(queue);

    }

  }, [queue]);

}
