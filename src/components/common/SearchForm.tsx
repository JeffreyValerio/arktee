'use client'

import Form from 'next/form'
import { useSearchParams } from 'next/navigation'
import { Icons } from './Icons'
import { SearchFormReset } from './SearchFormReset'

export const SearchForm = () => {

    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ""

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        setTimeout(() => {
            form.reset();
        }, 0);
    };

    return (
        <Form
            action={'/search'}
            scroll={false}
            onSubmit={handleSubmit}
            className="search-form relative flex items-center w-full rounded pr-4 bg-primary">
            <input
                name='query'
                className='bg-primary w-full'
                type="text"
                defaultValue={query}
                placeholder="Busca tus camisetas favoritas"
            />

            <div className="flex items-center gap-2">
                {query && <SearchFormReset />}
                <Icons.search />
            </div>
        </Form>
    )
}