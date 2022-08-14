// https://pragmaticpineapple.com/add-newsletter-subscription-form-to-react-website/
import React, {useState} from 'react';

const SubscribeForm = () => {
  const [status, setStatus] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const FORM_URL = `https://e87181b8.sibforms.com/serve/MUIEADv-K7Nrjjny5aQgllp-40zc64aCay5Fp7ZoQrPeyP1TJJ1fohRUSX5ZZUTHszdvFNKE8NIZ-znaJuyffY2aLhvD7O5aW7cl_hx-qgQwF1tk2xrKiDPrCE1HI3IDE3mBkB0kVHRp35y7XPqyh4JyaeMbqh81u8HvkBrgRHU_sHpP2NNcAr4baiOBDiVeGAa91ikhPFmEFGRy`

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = new FormData(event.target as HTMLFormElement)

    try {
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      })
      const json = await response.json()

      if (json.status === "success") {
        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Your first name"
        name="fields[first_name]"
        placeholder="Your first name"
        type="text"
        onChange={handleNameChange}
        value={name}
      />
      <input
        aria-label="Your email address"
        name="email_address"
        placeholder="Your email address"
        required
        type="email"
        onChange={handleEmailChange}
        value={email}
      />
      <button>SUBSCRIBE</button>
    </form>
  )
}

export default SubscribeForm;