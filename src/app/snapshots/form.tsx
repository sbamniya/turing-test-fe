"use client";

import React, { useState } from "react";
import { updateSnapshot } from "./actions";

type PolicySchedule = {
  type: "daily" | "weekly";
  timezone: string;
  time: {
    hour: number;
    minutes: number;
  };
  days: number[]; // Array of days represented by numbers (e.g., 0 for Sunday)
  delete: {
    occurrence: "never" | "after";
    after?: number;
    unit?: "day" | "hour" | "minute" | "week";
  };
};

export type Policy = {
  name: string;
  id: number;
  directory: string;
  schedule: PolicySchedule;
  enabled: boolean;
  locked: boolean;
};
const convertDotNotationToNestedObject = (obj: any) => {
  const result = {};

  for (const key in obj) {
    const keys = key.split(".");
    keys.reduce((acc, part, index) => {
      if (index === keys.length - 1) {
        acc[part] = obj[key];
      } else {
        if (!acc[part]) {
          acc[part] = {};
        }
      }
      return acc[part];
    }, result as any);
  }

  return result;
};

const PolicyForm: React.FC<{ id: string; policy: Policy }> = ({
  id,
  policy,
}) => {
  const [state, setState] = useState(policy);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateSnapshot(id, state);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const { checked } = event.target as HTMLInputElement;
    console.log(name, value);
    let val: string | boolean | number[] = value;
    if (name === "locked" || name === "enabled") {
      val = checked;
    }
    if (name === "schedule.days") {
      const day = parseInt(value);
      val = state.schedule.days;
      if (day === -1) {
        val = checked ? [0, 1, 2, 3, 4, 5, 6] : [];
      } else {
        if (checked) {
          val.push(day);
        } else {
          const index = val.indexOf(day);
          val.splice(index, 1);
        }
      }
    }
    const values = convertDotNotationToNestedObject({
      ...state,
      [name]: val,
    }) as Policy;
    setState(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-3">
          <label
            htmlFor="ProjectX_Daily"
            className="block text-sm font-medium leading-6 text-[#C7CACC]"
          >
            Policy Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="ProjectX_Daily"
              autoComplete="ProjectX_Daily"
              placeholder="ProjectX_Daily"
              value={state.name}
              onChange={onChange}
              className="block p-4 bg-[#424B53] w-full rounded-md border-0 py-1.5 text-[#C7CACC] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#C7CACC] focus:ring-2 focus:ring-inset focus:ring-[#C7CACC] sm:text-sm sm:leading-6 focus-within:ring-[#C7CACC]"
            />
          </div>
        </div>
        <div className="col-span-6">
          <label
            htmlFor="Apply_to_Directory"
            className="block text-sm font-medium leading-6 text-[#C7CACC]"
          >
            Apply to Directory
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#C7CACC] sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-[#C7CACC] px-4 sm:text-sm">
                /
              </span>
              <input
                type="text"
                name="directory"
                id="Apply_to_Directory"
                autoComplete="Apply_to_Directory"
                className="block p-4 bg-[#424B53] w-full border-0 py-1.5 text-[#C7CACC] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#C7CACC] focus:ring-2 focus:ring-inset focus:ring-[#C7CACC] sm:text-sm sm:leading-6 focus-within:ring-[#C7CACC]"
                placeholder="XYZ"
                value={state.directory}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <label className="block text-sm font-medium leading-6 text-[#C7CACC] mb-3">
            Run Policy on the Following Schedule
          </label>
          <div className="bg-[#424B53] p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-right p-2">
                <label className="text-sm font-medium w-[250px] text-right leading-6 text-[#C7CACC]">
                  Select Schedule Type
                </label>
              </div>
              <select
                className="p-2 bg-[#424B53] w-[300px] rounded-md border-0 py-1.5 text-[#C7CACC] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#C7CACC] focus:ring-2 focus:ring-inset focus:ring-[#C7CACC] sm:text-sm sm:leading-6 focus-within:ring-[#C7CACC]"
                value={state.schedule.type}
                name="schedule.type"
                onChange={onChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="text-right p-2">
                <label className="text-sm font-medium w-[250px] text-right leading-6 text-[#C7CACC]">
                  Set to Time Zone
                </label>
              </div>
              <span className="block text-sm font-medium w-[300px] leading-6 text-[#C7CACC]">
                {state.schedule.timezone}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-right">
              <div className="text-right p-2 items-center">
                <label className="text-sm font-medium w-[250px] text-right leading-6 text-[#C7CACC]">
                  Take a Snapshot at
                </label>
              </div>
              <div className="flex gap-2 items-center w-[300px]">
                <input
                  type="text"
                  name="schedule.time.hour"
                  id="hour"
                  autoComplete="hour"
                  placeholder="07"
                  className="block p-2 bg-[#424B53] w-[50px] rounded-md border-0 py-1.5 text-[#C7CACC] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#C7CACC] focus:ring-2 focus:ring-inset focus:ring-[#C7CACC] sm:text-sm sm:leading-6 focus-within:ring-[#C7CACC]"
                  value={state.schedule.time.hour}
                  onChange={onChange}
                />
                :
                <input
                  type="text"
                  name="schedule.time.minutes"
                  id="minutes"
                  autoComplete="minutes"
                  placeholder="00"
                  className="block p-2 bg-[#424B53] w-[50px] rounded-md border-0 py-1.5 text-[#C7CACC] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#C7CACC] focus:ring-2 focus:ring-inset focus:ring-[#C7CACC] sm:text-sm sm:leading-6 focus-within:ring-[#C7CACC]"
                  value={state.schedule.time.minutes}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="text-right p-4">
                <label className="text-sm font-medium w-[250px] text-right leading-6 text-[#C7CACC]">
                  On the Following Day(s)
                </label>
              </div>
              <div className="py-4">
                <div className="inline-flex flex-wrap">
                  {[
                    "Every day",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thur",
                    "Fri",
                    "Sat",
                    "Sun",
                  ].map((day, i) => (
                    <label key={day} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        name="schedule.days"
                        checked={
                          day === "Every day"
                            ? [0, 1, 2, 3, 4, 5, 6].every((k) =>
                                state.schedule.days.includes(k)
                              )
                            : state.schedule.days.includes(i - 1)
                        }
                        value={i - 1}
                        onChange={onChange}
                        className="mr-2"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="text-right p-4">
                <label className="text-sm font-medium w-[250px] text-right leading-6 text-[#C7CACC]">
                  Delete Each Snapshot
                </label>
              </div>
              <div className="py-4">
                <div className="inline-flex flex-wrap">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="schedule.delete.occurrence"
                      className="mr-2"
                      checked={state.schedule.delete.occurrence === "never"}
                      value="never"
                      onChange={onChange}
                    />
                    Never
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="schedule.delete.occurrence"
                      className="mr-2"
                      checked={state.schedule.delete.occurrence === "after"}
                      value="after"
                      onChange={onChange}
                    />
                    Automatically after
                  </label>
                  <input
                    type="text"
                    name="schedule.delete.after"
                    id="hour"
                    autoComplete="hour"
                    placeholder="07"
                    className="block p-2 bg-[#424B53] w-[50px] rounded-md border-0 py-1.5 text-[#C7CACC] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#C7CACC] focus:ring-2 focus:ring-inset focus:ring-[#C7CACC] sm:text-sm sm:leading-6 focus-within:ring-[#C7CACC]"
                    value={state.schedule.delete.after}
                    onChange={onChange}
                  />
                  &nbsp; &nbsp;
                  <select
                    name="schedule.delete.unit"
                    id="minutes"
                    autoComplete="minutes"
                    className="block p-2 bg-[#424B53] w-[80px] rounded-md border-0 py-1.5 text-[#C7CACC] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#C7CACC] focus:ring-2 focus:ring-inset focus:ring-[#C7CACC] sm:text-sm sm:leading-6 focus-within:ring-[#C7CACC]"
                    value={state.schedule.delete.unit}
                    onChange={onChange}
                  >
                    <option value="day">Day(s)</option>
                    <option value="hour">Hour(s)</option>
                    <option value="minute">Minutes(s)</option>
                    <option value="week">Week(s)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <label className="text-sm font-medium w-[250px] text-right leading-6 text-[#C7CACC]">
            Snapshot Locking
          </label>
          <p className="text-sm text-[#A6AAAE]">
            Locked snapshots cannot be deleted before the deletion schedule
            expires. For this feature to be available, snapshots must be set to
            automatically delete.
          </p>
          <div className="flex items-center my-4">
            <input
              id="locking"
              type="checkbox"
              name="locked"
              className="w-[16px] h-[16px] text-blue-600 bg-[#646B72] border-[#424B53] rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={state.locked}
              onChange={onChange}
            />
            <label
              htmlFor="locking"
              className="ms-2 text-sm text-[#C7CACC] cursor-pointer"
            >
              Enable locked snapshots
            </label>
          </div>

          <div className="flex items-center my-[40px]">
            <input
              id="enable-policy"
              type="checkbox"
              name="enabled"
              className="w-[16px] h-[16px] text-blue-600 bg-[#646B72] border-[#424B53] rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={state.enabled}
              onChange={onChange}
            />
            <label
              htmlFor="enable-policy"
              className="ms-2 text-sm text-[#C7CACC] cursor-pointer"
            >
              Enable policy
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-white bg-[#0298FF] text-sm px-5 py-2.5 rounded-[4px]"
            >
              Save Policy
            </button>
            <button type="button" className="text-[#0298FF]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PolicyForm;
