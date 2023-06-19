export default function({ app, redirect }) {
  const userRoles = app.$auth.user.roles.map(item => item.name)


  if (userRoles && userRoles === "admin") {
    //redirect to adminPage
  } else {
    //unauthorized
  }

}
