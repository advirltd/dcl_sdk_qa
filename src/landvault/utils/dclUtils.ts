import { getUserData, UserData } from '@decentraland/Identity'

export class DclUtils {

  private static userData: UserData

  static getUserData() {

    if (this.userData == null) {
      executeTask(async () => {
        let data = await getUserData()
        log(data)
        this.userData = data
      })
    }

    return this.userData
  }

}