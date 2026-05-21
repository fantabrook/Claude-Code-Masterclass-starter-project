import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import AuthForm from "@/components/AuthForm"

describe("AuthForm — login mode", () => {
  it("renders email field, password field, and Log In button", () => {
    render(<AuthForm mode="login" />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument()
  })

  it("has a switch link pointing to /signup", () => {
    render(<AuthForm mode="login" />)
    expect(screen.getByRole("link", { name: /sign up/i })).toHaveAttribute("href", "/signup")
  })
})

describe("AuthForm — signup mode", () => {
  it("renders email field, password field, and Sign Up button", () => {
    render(<AuthForm mode="signup" />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument()
  })

  it("has a switch link pointing to /login", () => {
    render(<AuthForm mode="signup" />)
    expect(screen.getByRole("link", { name: /log in/i })).toHaveAttribute("href", "/login")
  })
})

describe("AuthForm — password visibility toggle", () => {
  it("password field defaults to hidden", () => {
    render(<AuthForm mode="login" />)
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password")
  })

  it("clicking the toggle reveals the password, clicking again hides it", () => {
    render(<AuthForm mode="login" />)
    const toggle = screen.getByRole("button", { name: "Show password" })
    fireEvent.click(toggle)
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text")
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }))
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password")
  })
})

describe("AuthForm — form submission", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("login form logs email and password on submit", () => {
    render(<AuthForm mode="login" />)
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } })
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret" } })
    fireEvent.submit(screen.getByRole("button", { name: "Log In" }).closest("form")!)
    expect(console.log).toHaveBeenCalledWith({ email: "test@example.com", password: "secret" })
  })

  it("signup form logs email and password on submit", () => {
    render(<AuthForm mode="signup" />)
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "new@example.com" } })
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "pass123" } })
    fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }).closest("form")!)
    expect(console.log).toHaveBeenCalledWith({ email: "new@example.com", password: "pass123" })
  })
})
