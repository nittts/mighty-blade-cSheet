import { createSheetPayload } from "@/types/sheets";

type createSheetForms = {
  onFinish: (payload: createSheetPayload) => void;
  initialValues: {
    name: string;
  };
};

export default function CreateSheetForm({ onFinish, initialValues }: createSheetForms) {
  return <div>Form</div>;
}
