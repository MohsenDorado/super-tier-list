"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddList = () => {
  const [person, setPerson] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  const createCard = async ({
    person,
    amount,
  }: {
    person: string;
    amount: number;
  }) => {
    const response = await fetch("/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ person, amount }),
    });

    if (!response.ok) {
      // Extract error message from response (if any)
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Failed to create new card";
      throw new Error(errorMessage);
    }

    return response.json();
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listData"] });
      setPerson("");
      setAmount(null);
      toast.success(
        <strong>

          کارت اضافه شد
        </strong>
      ); // Show success toast with person's name
    },
    onError: (error: Error) => {
      toast.error(
        `${
          error.message === "Unexpected end of JSON input" ? (
            <strong>ورودی قابل قبول نیست</strong>
          ) : (
            <strong>کارت اضافه نشد</strong>
          )
        }`
      );
      // toast.custom(
      //   (t) => (
      //     <div
      //       className={`${
      //         t.visible ? "animate-enter" : "animate-leave"
      //       } max-w-md w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-right rounded-lg shadow-lg flex items-center`}
      //     >
      //       <span className="mr-2">❌</span>
      //       <div>
      //         کارت برای <strong>{person}</strong> اضافه نشد. دلیل :{" "}
      //         {error.message === "Unexpected end of JSON input"
      //           ? "ورودی بیش از حد"
      //           : "اتصال نا مرغوب"}
      //       </div>
      //     </div>
      //   ),
      //   { duration: 2000 }
      // );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      createMutation.mutate({ person, amount });
    }
  };

  const handleAmountChange = (e: any) => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    if (!isNaN(numberValue)) {
      setAmount(numberValue);
    } else {
      setAmount(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Person:
            <input
              type="text"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              className="font-vazir decoration"
              type="number"
              value={amount !== null ? amount : ""}
              onChange={handleAmountChange}
              required
              min="0"
              step="1"
            />
          </label>
        </div>
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create Card"}
        </button>
      </form>
    </div>
  );
};

export default AddList;
