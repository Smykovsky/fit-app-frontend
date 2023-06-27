export default function({ app, redirect, store }) {
  const userRoles = app.$auth.user.roles.map(item => item.name)
  const isAdmin = userRoles.includes("admin")

  if (!isAdmin) {
    redirect('/')
    alert("Nie masz uprawnień ")
  }

}
