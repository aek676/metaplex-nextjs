import Header from "@/components/header";
import TransferSolComponent from "@/components/TransferSolComponent";
import UploadFileComponent from "@/components/UploadFileComponent";

export default function Page() {
  return (
    <div>
      <Header />
      <br />
      <TransferSolComponent />
      <UploadFileComponent />
    </div>
  );
}
