"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, MoreHorizontal, Plus, Search, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import Nav from "@/components/Nav"
import { useEffect, useState } from "react"
import axios from "axios"
import { Loading } from "@/components/Loading.components"
import { getLanguage } from "@/lib/language"
import { useLanguageContext } from "@/components/LanguageProvider"
import AuthPage from "@/components/AuthPage.component"
import { headers } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
 

export default function Accounts() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any>([])
  const [selectedAll, setSelectedAll] = useState<any>(false)

  const [loadingAccounts, setLoadingAccounts] = useState(true)

  useEffect(() => {
    console.log(selected)
  }, [selected])

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.home)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])

  useEffect(() => {
    getLanguage().then(res => {
      setLanguage(res)
    })
  }, [])

  useEffect(() => {
    getAccounts()
  }, [])

  useEffect(() => {
    getAccounts()
  }, [page])

  function handleSelectedAll(value: any){
    if (value) {
      const select = []
      for(let i = 0; i< data.data.length; i++){
        select.push(data.data[i].id)
      }
      setSelected(select);
     } else {
      setSelected([]);
     }
  }

  function handleSelect(value: any, name: any) {
    if (value) {
      setSelected([...selected, name]);
    } else {
      setSelected(selected.filter((item: any) => item !== name));
    }
  };

  function paginate(num: number){
    if(num > 0 && num <= data.all_page){
      setPage(num)
    }
  }

  function getAccounts(){
    axios.get(process.env.NEXT_PUBLIC_API + `/cf-accounts?size=20&page=${page}`, {headers: headers}).then((res:any) => {
      if(!res.data.error?.length){
        setData(res.data.result[0])
        // setPage(res.data.result[0].current_page)
        // console.log(res.data.result[0])

      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    }).finally(() => setLoadingAccounts(false))
  }

  // useEffect(() => {
  //   console.log('table', table.getRowModel())
  // }, [table])

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {isAuthorized?
      <div>
        <Nav />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">Accounts</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="flex justify-between mt-8 max-sm:flex-col max-sm:gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="email@email.com"
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link href="/accounts/add"><Button><Plus className="h-4 mr-1"/>Add accounts</Button></Link>
            </div>
            {data?.data?.length == 0 && !loadingAccounts ? <div className="flex gap-2 items-center"><SearchX /> {lang?.not}</div> : null}
            {loadingAccounts ? <div className="flex gap-2 items-center mt-4"><Loader2 className="animate-spin w-5 h-5"/>Downloading a list of accounts...</div> : 
              <div className="w-full mt-5">
              <Table className="border rounded-lg">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]"><Checkbox name="all" checked={selected.length === data?.data?.length} onCheckedChange={(value) => handleSelectedAll(value)} /></TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox name={item.id} checked={selected.includes(item.id)} onCheckedChange={(value) => handleSelect(value, item.id)}/>
                      </TableCell>
                      <TableCell>{item?.account_id}</TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => navigator.clipboard.writeText(item.email)}
                            >
                              Copy email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-3 gap-3 max-sm:flex-col">
                <div className="flex whitespace-nowrap text-sm text-muted-foreground">{page} of {data.all_page} row(s) selected.</div>
                <div className="flex gap-2">
                  <div onClick={() => paginate(1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex">
                    <ChevronsLeft className="w-[15px] h-[16px]"/>
                  </div>
                  <div onClick={() => paginate(page - 1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex">
                    <ChevronLeft className="w-[15px] h-[16px]"/>
                  </div>
                  <div onClick={() => paginate(page + 1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex">
                    <ChevronRight className="w-[15px] h-[16px]"/>
                  </div>
                  <div onClick={() => paginate(data.all_page)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex">
                    <ChevronsRight className="w-[15px] h-[16px]"/>
                  </div>
                </div>
                {/* <div className="text-xs text-muted-foreground">Showing <strong>{DNS?.page?.page}-{DNS?.page?.total_pages}</strong> of <strong>{DNS?.page?.total_count}</strong> dns</div> */}
              </div>
            </div>
            }
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  )
}
