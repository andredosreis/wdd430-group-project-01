
export type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
export const mockCustomers: Customer[] = [
  { id: "c1", name: "Alice Smith",   email: "alice@exemplo.com",  phone: "123-456-7890" },
  { id: "c2", name: "Bob Johnson",   email: "bob@exemplo.com",    phone: "987-654-3210" },
  { id: "c3", name: "Charlie Brown", email: "charlie@exemplo.com",phone: "555-555-5555" },
  { id: "c4", name: "Diana Prince",  email: "diana@exemplo.com",  phone: "111-222-3333" },
];