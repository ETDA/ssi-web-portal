import {useObjectLoader} from '~/hooks/loaderObject'
import {NewRequester} from '~/lib/Requester'
import {Core} from '~/core/Core'

export const useUserVerifyGet = () => {
  const loader = useObjectLoader<any>()
  const run = (token: string) => {
    loader.run(() => NewRequester.get(Core.DefaultAPI(`web/user-verify?token=${token}`)))
  }
  return {
    ...loader, run
  }
}
export const useUserVerifyPost = () => {
  const loader = useObjectLoader<any>()
  const run = (token: string, password: string) => {
    loader.run(() => NewRequester.post(Core.DefaultAPI(`web/user-verify`), {
      token, password
    }))
  }
  return {
    ...loader, run
  }
}
