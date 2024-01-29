// src/components/PostGrid.test.js
import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PostGrid from "../components/PostGrid";

const mockAxios = new MockAdapter(axios);
jest.mock('axios');

const mockData = {
  data: [
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
  ]
}

describe("PostGrid component", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("renders the component", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));


    const renderScreen = render(<PostGrid />);

    // Wait for data to be loaded
    await waitFor(() => {
      expect(renderScreen.baseElement.innerHTML.toString().includes('Employees Details')).toBeTruthy();
    });

    // expect(screen.getByText("UserName:")).toBeInTheDocument();
    // expect(screen.getByText("Email:")).toBeInTheDocument();
    // expect(screen.getByText("Company:")).toBeInTheDocument();

    // Additional assertions can be added based on your component's content
  });

  // it("handles API error", async () => {
  //   axios.get.mockImplementationOnce(() => Promise.resolve(mockData));


  //   const renderScreen = render(<PostGrid />);

  //   // Wait for data to be loaded
  //   await waitFor(() => {
  //     expect(renderScreen.baseElement.innerHTML.toString().includes('Error fetching data:')).toBeTruthy();
  //   });


});


});
