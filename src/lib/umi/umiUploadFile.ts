import { createGenericFile } from "@metaplex-foundation/umi";
import umiWithCurrentWalletAdapter from "./umiWithCurrentWalletAdapter";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { createIrysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { nftStorageUploader } from "@metaplex-foundation/umi-uploader-nft-storage";
import { create } from "domain";

const umiUploadFile = async (file: File) => {
  try {
    const myAbortSignal = new AbortController().signal;
    const umi = umiWithCurrentWalletAdapter();

    const fileBuffer = await file.arrayBuffer();
    const fileUmi = createGenericFile(new Uint8Array(fileBuffer), file.name, {
      contentType: file.type,
    });
    console.log(`Umi: ${umi.payer.publicKey}`);

    const uploader = createIrysUploader(umi);

    console.log(`FileUmi: ${fileUmi.fileName}`);

    const [uri] = await uploader.upload([fileUmi], {
      onProgress: (progress) => {
        console.log(`[Progreso]: ${(progress * 100).toFixed(2)}% subido`);
      },
    });

    console.log("Subido a:", uri);
  } catch (error) {
    console.error("Error al subir el archivo:", error);
  }
};

export default umiUploadFile;

// https://arweave.net/2ZBaqqsztXi6A6LfciKUBuGBxZ34QqLjmcwWdSEx9eKE
