import React, {useEffect, useState} from "react";
import {useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debouce";

export function HomePage() {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const debounced = useDebounce(search)
    const {isLoading, isError, data: users} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
    refetchOnFocus: true})

    useEffect(() => {
        setDropdown(debounced.length > 3 && users?.length! > 0)
    }, [search, users])

    const clickHandler = (username: string) => {}
    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">{isError &&
            <p className="text-center font-bold text-red-600">Something happend</p>}
            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for Github username..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}/>

            {dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-mg bg-white">
                {isLoading && <p className="text-center">Loading...</p>}
                {users?.map(user => (
                    <li key={user.id}
                        onClick={() => clickHandler((user.login))}
                                         className="text-center py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer">{user.login}</li>))}
            </ul>}
            </div>
        </div>
    )
}