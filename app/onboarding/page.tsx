'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  "businessName",
  "businessType",
  "location",
  "hours",
  "policies",
  "services",
  "staff",
  "extra",
  "confirm",
];

const initialForm = {
  businessName: "",
  businessType: "",
  address: "",
  city: "",
  country: "",
  instagram: "",
  hours: {
    defaultOpen: "09:00",
    defaultClose: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    custom: {},
  },
  policies: {
    depositNoticeHours: "5",
  },
  services: [],
  staff: [],
  parking: "",
  directions: "",
};

const defaultDurations = ["15", "30", "45", "60", "90", "120"];
const defaultNoticeOptions = ["3", "5", "8", "24", "48", "72"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function OnboardingPage() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [showCustomizeHours, setShowCustomizeHours] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "", duration: "45" });
  const [newStaff, setNewStaff] = useState({ firstName: "", lastName: "", phone: "", services: [] });

  const updateForm = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleServiceAdd = () => {
    updateForm("services", [...form.services, newService]);
    setNewService({ name: "", price: "", duration: "45" });
  };

  const handleStaffAdd = () => {
    updateForm("staff", [...form.staff, newStaff]);
    setNewStaff({ firstName: "", lastName: "", phone: "", services: [] });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <Card>
        <CardContent className="space-y-4 mt-4">
          {steps[step] === "businessName" && (
            <>
              <h2 className="text-xl font-semibold">Business Name</h2>
              <Input value={form.businessName} onChange={e => updateForm("businessName", e.target.value)} placeholder="e.g. Bella Nails" />
            </>
          )}

          {steps[step] === "businessType" && (
            <>
              <h2 className="text-xl font-semibold">Business Type</h2>
              <select
                value={form.businessType}
                onChange={e => updateForm("businessType", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Choose one</option>
                <option>Salon</option>
                <option>Nail Studio</option>
                <option>Tattoo Artist</option>
                <option>Pet Groomer</option>
                <option>Coach</option>
                <option>Therapist</option>
              </select>
            </>
          )}

          {steps[step] === "location" && (
            <>
              <h2 className="text-xl font-semibold">Business Location</h2>
              <Input placeholder="Address" value={form.address} onChange={e => updateForm("address", e.target.value)} />
              <Input placeholder="City" value={form.city} onChange={e => updateForm("city", e.target.value)} />
              <Input placeholder="Country" value={form.country} onChange={e => updateForm("country", e.target.value)} />
            </>
          )}

          {steps[step] === "hours" && (
            <>
              <h2 className="text-xl font-semibold">Working Hours</h2>
              <label className="text-sm text-muted-foreground">Default opening/closing time</label>
              <div className="flex gap-4">
                <Input type="time" value={form.hours.defaultOpen} onChange={e => updateForm("hours", { ...form.hours, defaultOpen: e.target.value })} />
                <Input type="time" value={form.hours.defaultClose} onChange={e => updateForm("hours", { ...form.hours, defaultClose: e.target.value })} />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {weekdays.map(day => (
                  <label key={day} className="text-sm">
                    <input
                      type="checkbox"
                      checked={form.hours.days.includes(day)}
                      onChange={e => {
                        const updatedDays = e.target.checked
                          ? [...form.hours.days, day]
                          : form.hours.days.filter(d => d !== day);
                        updateForm("hours", { ...form.hours, days: updatedDays });
                      }}
                    />{" "}
                    {day}
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="text-blue-600 text-sm mt-2 underline"
                onClick={() => setShowCustomizeHours(s => !s)}
              >
                {showCustomizeHours ? "Hide custom hours" : "Customize ▼"}
              </button>

              {showCustomizeHours && (
                <div className="mt-4 space-y-2">
                  {weekdays.map(day => (
                    <div key={day} className="flex items-center gap-2">
                      <label className="w-24">{day}</label>
                      <Input
                        type="time"
                        value={form.hours.custom?.[day]?.open || ""}
                        onChange={e =>
                          updateForm("hours", {
                            ...form.hours,
                            custom: {
                              ...form.hours.custom,
                              [day]: {
                                ...form.hours.custom?.[day],
                                open: e.target.value,
                              },
                            },
                          })
                        }
                      />
                      <Input
                        type="time"
                        value={form.hours.custom?.[day]?.close || ""}
                        onChange={e =>
                          updateForm("hours", {
                            ...form.hours,
                            custom: {
                              ...form.hours.custom,
                              [day]: {
                                ...form.hours.custom?.[day],
                                close: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {steps[step] === "policies" && (
            <>
              <h2 className="text-xl font-semibold">Deposit Policy</h2>
              <label className="block text-sm mb-1">Collect a deposit if the client cancels less than:</label>
              <select
                className="w-full p-2 border rounded"
                value={form.policies.depositNoticeHours}
                onChange={e => updateForm("policies", { ...form.policies, depositNoticeHours: e.target.value })}
              >
                {defaultNoticeOptions.map(h => (
                  <option key={h} value={h}>
                    {h} hours before
                  </option>
                ))}
              </select>
            </>
          )}

          {steps[step] === "services" && (
            <>
              <h2 className="text-xl font-semibold">Services</h2>
              <Input placeholder="Service Name" value={newService.name} onChange={e => setNewService(s => ({ ...s, name: e.target.value }))} />
              <div className="flex gap-2 mt-2">
                <select
                  className="flex-1 border rounded p-2"
                  value={newService.duration}
                  onChange={e => setNewService(s => ({ ...s, duration: e.target.value }))}
                >
                  {defaultDurations.map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <Input
                  className="flex-1"
                  placeholder="Price (e.g. $40)"
                  value={newService.price}
                  onChange={e => setNewService(s => ({ ...s, price: e.target.value }))}
                />
              </div>
              <Button className="mt-2" onClick={handleServiceAdd}>
                Add Service
              </Button>
              <ul className="text-sm mt-4 space-y-1">
                {form.services.map((s, i) => (
                  <li key={i}>
                    {s.name} – {s.duration} min – ${s.price}
                  </li>
                ))}
              </ul>
            </>
          )}

          {steps[step] === "staff" && (
            <>
              <h2 className="text-xl font-semibold">Add Staff</h2>
              <Input placeholder="First Name" value={newStaff.firstName} onChange={e => setNewStaff(s => ({ ...s, firstName: e.target.value }))} />
              <Input placeholder="Last Name" value={newStaff.lastName} onChange={e => setNewStaff(s => ({ ...s, lastName: e.target.value }))} />
              <Input placeholder="Mobile Phone" value={newStaff.phone} onChange={e => setNewStaff(s => ({ ...s, phone: e.target.value }))} />
              <label className="block text-sm mt-2 mb-1">Services:</label>
              {form.services.map(service => (
                <label key={service.name} className="text-sm block">
                  <input
                    type="checkbox"
                    checked={newStaff.services.includes(service.name)}
                    onChange={e => {
                      const newList = e.target.checked
                        ? [...newStaff.services, service.name]
                        : newStaff.services.filter(s => s !== service.name);
                      setNewStaff(s => ({ ...s, services: newList }));
                    }}
                  />{" "}
                  {service.name}
                </label>
              ))}
              <Button className="mt-2" onClick={handleStaffAdd}>
                Add Staff
              </Button>
            </>
          )}

          {steps[step] === "extra" && (
            <>
              <h2 className="text-xl font-semibold">Additional Info</h2>
              <Input placeholder="Instagram Handle (optional)" value={form.instagram} onChange={e => updateForm("instagram", e.target.value)} />
              <Textarea placeholder="Parking instructions" value={form.parking} onChange={e => updateForm("parking", e.target.value)} />
              <Textarea placeholder="How to get to us" value={form.directions} onChange={e => updateForm("directions", e.target.value)} />
            </>
          )}

          {steps[step] === "confirm" && (
            <>
              <h2 className="text-xl font-semibold">Review Your Info</h2>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(form, null, 2)}
              </pre>
              <Button className="mt-2 bg-green-600 hover:bg-green-700 text-white">Submit</Button>
            </>
          )}
        </CardContent>

        <div className="flex justify-between items-center p-4 border-t">
          {step > 0 && (
            <Button variant="outline" onClick={back}>
              Back
            </Button>
          )}
          {step < steps.length - 1 && (
            <Button onClick={next} className="bg-blue-600 hover:bg-blue-700 text-white">
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
