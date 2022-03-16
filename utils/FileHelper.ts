export class FileHelper {
  static toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  static printByURL = (link: string) => {
    try {
      const w: any = window.open(link, '_blank')
      w.focus()
    } catch (e) {
      console.error('print error', e)
    }
  }

  static async readFileAsync (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()

      reader.onload = (ev) => {
        resolve((ev.target ? ev.target.result : '') as any)
      }

      reader.onerror = reject

      reader.readAsText(file)
    })
  }
}
