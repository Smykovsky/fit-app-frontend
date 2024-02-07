export default function({ app, redirect}) {
  const isAdmin = app.$auth.user.roles.includes("admin")

  if (!isAdmin) {
    redirect('/')
    alert("Nie masz uprawnień ")
  }
}
