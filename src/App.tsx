import { useState } from "react";
import { InputField, DataTable, Column } from "./components";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const sampleUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com", age: 24 },
  { id: 2, name: "Bob", email: "bob@test.com", age: 30 },
  { id: 3, name: "Carol", email: "carol@test.com", age: 27 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div className={dark ? "dark min-h-screen" : "min-h-screen"}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <header className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Component Demo</h1>
          <button
            className="px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-700"
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
          >
            Change Theme {dark ? "Light" : "Dark"}
          </button>
        </header>

        <main className="p-6 space-y-8">
          <section className="space-y-6">
            <h2 className="text-lg font-semibold mb-2">InputField Demo</h2>

            {/* ✅ Default controlled input */}
            <InputField
              label="Email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="We'll keep your email safe."
              clearable
              variant="outlined"
              size="md"
            />

            {/* ✅ Invalid with error message */}
            <InputField
              label="Invalid Email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid
              errorMessage="Please enter a valid email address."
              variant="outlined"
              size="md"
            />

            {/* ✅ Disabled */}
            <InputField
              label="Disabled"
              placeholder="Disabled input"
              value="Can't edit me"
              disabled
              helperText="This field is disabled."
              variant="filled"
              size="md"
            />

            {/* ✅ Loading */}
            <InputField
              label="Loading"
              placeholder="Fetching..."
              value="Loading state"
              loading
              helperText="Simulating async validation…"
              variant="ghost"
              size="md"
            />

            {/* ✅ Variants + Sizes */}
            <div className="grid gap-4 md:grid-cols-3">
              <InputField
                label="Small"
                placeholder="sm"
                size="sm"
                variant="outlined"
              />
              <InputField
                label="Medium"
                placeholder="md"
                size="md"
                variant="filled"
              />
              <InputField
                label="Large"
                placeholder="lg"
                size="lg"
                variant="ghost"
              />
            </div>

            {/* ✅ Password toggle */}
            <InputField
              label="Password"
              placeholder="••••••••"
              type="password"
              showPasswordToggle
              helperText="Use at least 8 characters."
              variant="outlined"
              size="md"
            />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">DataTable Demo</h2>
            <DataTable<User>
              data={sampleUsers}
              columns={columns}
              selectable
              onRowSelect={setSelected}
            />
            <p className="mt-2 text-sm">
              Selected: {selected.map((u) => u.name).join(", ")}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
