import { useStore } from "@nuxtjs/composition-api"
import { useObjectLoader } from "~/hooks/loaderObject"
import { NewRequester } from "~/lib/Requester"
import { Core } from "~/core/Core"
import { IOrganizationItem } from "~/models/organizationModel"

export const useGenerateKey = () => {
  const { state } = useStore()
  const loader = useObjectLoader<IOrganizationItem>()
  const run = (algor: string) => {
    console.log(algor)
    let path = `/web/key/generate`
    if (algor === "RSA") {
      path = `/web/key/generate/rsa`
    }
    loader.run(() =>
      NewRequester.post(
        Core.DefaultAPI(path),
        null,
        Core.DefaultAPIOptions(state)
      )
    )
  }
  return {
    ...loader,
    run,
  }
}

export const useUploadKey = () => {
  const { state } = useStore()
  const loader = useObjectLoader<IOrganizationItem>()
  const run = (data: { x509_certificate: string; x509_key: string }) => {
    loader.run(() =>
      NewRequester.post(
        Core.DefaultAPI("/web/key/upload/x509"),
        data,
        Core.DefaultAPIOptions(state)
      )
    )
  }
  return {
    ...loader,
    run,
  }
}
