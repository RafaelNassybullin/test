import { CreatedUser } from "./created-user";
import { ChangedName } from "./changed-name";
import { ChangedImage } from "./changed-image";
import { History } from "@prisma/client";

export default function HistoryItemRow({
  histories,
}: {
  histories: History[];
}) {
  return (
    <>
      {histories.map((history: History) => {
        if (history.status === "CREATED") {
          return (
            <CreatedUser
              id={history.userID}
              name={history.oldname}
              date={history.createdAt}
              oldimage={history.oldimage}
            />
          );
        }
        if (history.status === "CHANGEDNAME") {
          return (
            <ChangedName
              id={history.userID}
              name={history.newname}
              date={history.createdAt}
              oldname={history.oldname}
            />
          );
        }
        if (history.status === "CHANGEDIMAGE") {
          return (
            <ChangedImage
              id={history.userID}
              newname={history.newname}
              oldimage={history.oldimage}
              date={history.createdAt}
              newimage={history.newimage}
            />
          );
        }
      })}
    </>
  );
}
