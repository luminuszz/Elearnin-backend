export abstract class UploadStoreProvider {
  abstract save(fileName: string): Promise<string>
  abstract delete(fileName: string): Promise<void>
}
