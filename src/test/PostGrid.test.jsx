// src/components/PostGrid.test.js
import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PostGrid from "../components/PostGrid";

const mockAxios = new MockAdapter(axios);

const mockData = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    company: { name: "Company A" },
  },
  {
    id: 2,
    username: "user2",
    email: "user2@example.com",
    company: { name: "Company B" },
  },
];

describe("PostGrid component", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("renders the component", async () => {
    mockAxios
      .onGet("https://jsonplaceholder.typicode.com/users")
      .reply(200, mockData);

    render(<PostGrid />);

    // Wait for data to be loaded
    await waitFor(() => {
      expect(screen.getByText("Employees Details")).toBeInTheDocument();
    });

    expect(screen.getByText("UserName:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Company:")).toBeInTheDocument();

    // Additional assertions can be added based on your component's content
  });

  it("handles API error", async () => {
    mockAxios.onGet("https://jsonplaceholder.typicode.com/users").reply(500);

    render(<PostGrid />);

    // Wait for error handling
    await waitFor(() => {
      expect(screen.getByText("Error fetching data:")).toBeInTheDocument();
    });

    // Additional error handling assertions can be added
  });
});
