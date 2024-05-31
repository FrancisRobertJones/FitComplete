/**
 * v0 by Vercel.
 * @see https://v0.dev/t/URvfq5v8RSH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

export default function Component() {
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState({ key: "id", order: "asc" })
    const [users, setUsers] = useState([
        {
            id: "user1",
            email: "john@example.com",
            firstName: "John",
            isAdmin: true,
        },
        {
            id: "user2",
            email: "jane@example.com",
            firstName: "Jane",
            isAdmin: false,
        },
        {
            id: "user3",
            email: "bob@example.com",
            firstName: "Bob",
            isAdmin: true,
        },
        {
            id: "user4",
            email: "alice@example.com",
            firstName: "Alice",
            isAdmin: false,
        },
        {
            id: "user5",
            email: "tom@example.com",
            firstName: "Tom",
            isAdmin: true,
        },
    ])
    const handleSearch = (e) => setSearch(e.target.value)
    const handleSort = (key) => {
        if (sort.key === key) {
            setSort({ key, order: sort.order === "asc" ? "desc" : "asc" })
        } else {
            setSort({ key, order: "asc" })
        }
    }
    const handleAdminToggle = (userId) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user)))
    }
    const filteredUsers = useMemo(
        () =>
            users
                .filter(
                    (user) =>
                        user.email.toLowerCase().includes(search.toLowerCase()) ||
                        user.firstName.toLowerCase().includes(search.toLowerCase()),
                )
                .sort((a, b) => {
                    if (sort.order === "asc") {
                        return a[sort.key] > b[sort.key] ? 1 : -1
                    } else {
                        return a[sort.key] < b[sort.key] ? 1 : -1
                    }
                }),
        [users, search, sort],
    )
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">User Management</h1>
                <Input
                    placeholder="Search users..."
                    className="bg-white dark:bg-gray-950"
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                            Email
                            {sort.key === "email" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("firstName")}>
                            First Name
                            {sort.key === "firstName" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                            User ID
                            {sort.key === "id" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                        </TableHead>
                        <TableHead>Admin</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                                <Switch
                                    id={`admin-toggle-${user.id}`}
                                    checked={user.isAdmin}
                                    onCheckedChange={() => handleAdminToggle(user.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}