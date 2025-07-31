import { Heading, Text } from "@react-email/components";
import React from "react";
import Wrapper from "./components/Wrapper";

export function NewUser({
  name,
  otp,
}: {
  name: string;
  otp: string;
}): JSX.Element {
  return (
    <Wrapper>
      <Heading as="h2" className="text-2xl font-bold mb-4">
        Welcome to SortX Maintenance Pro!
      </Heading>

      <Text>
        Dear {name},
      </Text>

      <Text>
        Thank you for joining SortX Maintenance Pro - the intelligent property maintenance solution that helps you streamline repairs, improve tenant satisfaction, and manage maintenance more efficiently.
      </Text>

      <Text>
        To get started, please verify your email address by entering the one-time password below:
      </Text>

      <div className="bg-gray-100 rounded-lg p-6 my-6 text-center">
        <Text className="text-sm text-gray-600 mb-2">
          Your verification code:
        </Text>
        <Text>
          <strong className="text-3xl font-bold tracking-wider">{otp}</strong>
        </Text>
      </div>

      <Text>
        Once verified, you'll be able to:
      </Text>

      <ul className="list-disc list-inside mb-4">
        <li>Receive and triage maintenance requests automatically with AI</li>
        <li>Track repairs from submission to completion</li>
        <li>Communicate seamlessly with tenants and contractors</li>
        <li>Generate insights to reduce maintenance costs</li>
      </ul>

      <Text>
        We're excited to help you transform how you manage property maintenance. If you have any questions, our support team is here to help.
      </Text>

      <Text className="text-sm text-gray-600 mt-6">
        This code will expire in 10 minutes for security reasons. If you didn't create an account with SortX, please ignore this email.
      </Text>
    </Wrapper>
  );
}

NewUser.subjects = {
  en: "Welcome to SortX - Please verify your email",
  de: "Willkommen bei SortX - Bitte bestätigen Sie Ihre E-Mail",
};

export default NewUser;
