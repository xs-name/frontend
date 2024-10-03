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
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Copy, Eye, EyeOff, Loader2, MoreHorizontal, Plus, Search, SearchX } from "lucide-react"

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
import { config, headers } from "@/lib/utils"
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label"
import { getUser } from "@/lib/user"
import { useUserContext } from "@/components/userProvider"
 

export default function Accounts() {
  const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any>([])
  const [selectedAll, setSelectedAll] = useState<any>(false)
  const [search, setSearch] = useState('');

  const [loadingAccounts, setLoadingAccounts] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [inpitPassword, setInpitPassword] = useState(true);
  const [password, setPassword] = useState('');

  const [openView, setOpenView] = useState(false)
  const [loadingView, setLoadingView] = useState(false);
  const [access, setAccess] = useState(false)
  const [idView, setIdView] = useState<any>(null)
  const [viewData, setViweData] = useState<any>(null)

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
    })
  }, [])

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.accounts)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])

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
      setSelected([...select, ...selected]);
    } else {
      let arr = selected;
      for(let i = 0; i< data.data.length; i++){
        arr = arr.filter((el: any) => el !== data.data[i].id)
      }
      setSelected(arr);
    }
  }

  useEffect(() => {
    let isActive = true;

    if(data?.data?.length == 0 || data?.data?.length == undefined){
      setSelectedAll(false)
      return
    }

    for(let i = 0; i < data?.data?.length; i++){
      // console.log(selected.indexOf(data.data[i].id))
      if(selected.indexOf(data.data[i].id) == -1){
        isActive = false
        break
      }
    }
    setSelectedAll(isActive)
  }, [selected, data])

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

  useEffect(() => {
    getAccounts()
    setPage(1)
  }, [search])

  function getAccounts(){
    axios.get(process.env.NEXT_PUBLIC_API + `/cf-accounts?size=20&page=${page}&email=${search}`, config).then((res:any) => {
      if(!res.data.error?.length){
        setData(res.data.result[0])
        // setPage(res.data.result[0].current_page)
        // console.log(res.data.result[0])

      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    }).finally(() => setLoadingAccounts(false))
  }

  useEffect(() => {
    setPage(1)
    getAccounts()
  }, [search])

  function deleteAccounts (){
    // '{"id": [5340, 5341], "password": "asdasd123"}'
    const data = {
      id: selected,
      password: password
    };

    const newConfig: any = config;
    newConfig.data = data

    axios.delete(process.env.NEXT_PUBLIC_API + `/cf-accounts`, newConfig).then((res:any) => {
      if(!res.data.error?.length){
        getAccounts()
      }else{
        toast("Произошла ошибка", {
          description: res.data.error[0].message
        })
      }
    }).finally(() => {
      setLoadingDelete(false)
      setPassword('')
      setOpenDelete(false)
    })
  }

  function viewAccounts (){
    // '{"id": [5340, 5341], "password": "asdasd123"}'
    const data = {
      id: idView,
      password: password
    };
    axios.post(process.env.NEXT_PUBLIC_API + `/cf-accounts`, data, config).then((res:any) => {

      if(!res.data.error?.length){
        setViweData(res.data.result[0])
        setAccess(true)
      }else{
        toast("Произошла ошибка", {
          description: res.data.error[0].message
        })
      }
    }).finally(() => {
      setLoadingView(false)
      setPassword('')
    })
  }

  // useEffect(() => {
  //   console.log('table', table.getRowModel())
  // }, [table])

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {user.length != 0?
      <div>
        <Toaster />
        <Nav />
        <AlertDialog open={openView} onOpenChange={setOpenView}>
          {access ? 
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{lang?.data_account}</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 flex-col">
                      <div className="font-semibold text-black">{lang?.email}: </div>
                      <div onClick={() => navigator.clipboard.writeText(viewData.email)} className="flex items-center gap-2 cursor-pointer">{viewData.email} <Copy className="w-[10px] h-[10px]"/></div>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <div className="font-semibold text-black">{lang?.token}: </div>
                      <div onClick={() => navigator.clipboard.writeText(viewData.token)} className="flex items-center gap-2 cursor-pointer">{viewData.token} <Copy className="w-[10px] h-[10px]"/></div>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <div className="font-semibold text-black">id: </div>
                      <div onClick={() => navigator.clipboard.writeText(viewData.account_id)} className="flex items-center gap-2 cursor-pointer">{viewData.account_id} <Copy className="w-[10px] h-[10px]"/></div>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button onClick={() => {
                  setLoadingView(false)
                  setOpenView(false)
                  setAccess(false)
                  setIdView(null)
                }}>{lang?.continue}</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          :
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{lang?.confirmation}</AlertDialogTitle>
                <AlertDialogDescription>
                  {lang?.confirmation_description}
                </AlertDialogDescription>
                <div className='max-lg:w-full'>
                  <Label className="text-xs text-muted-foreground mt-1">{lang?.enter_password}</Label>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type={inpitPassword ? "password" : "text"} icon={inpitPassword ? <Eye onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" /> : <EyeOff onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" />}/>
                </div> 
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loadingView}>{lang?.cancel}</AlertDialogCancel>
                <Button disabled={loadingView} onClick={() => {
                  setLoadingView(true)
                  viewAccounts()
                }}>{loadingView ? <div className="flex items-center gap-1"><Loader2 className="animate-spin w-4 h-4"/> {lang?.loading}</div> : lang?.continue}</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          }
        </AlertDialog>
        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogTrigger>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{lang?.confirmation}</AlertDialogTitle>
              <AlertDialogDescription>
              {lang?.confirm_count_1} {selected.length} {lang?.confirm_count_2}
              </AlertDialogDescription>
              <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground mt-1">{lang?.enter_password}</Label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type={inpitPassword ? "password" : "text"} icon={inpitPassword ? <Eye onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" /> : <EyeOff onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" />}/>
              </div> 
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loadingDelete}>{lang?.cancel}</AlertDialogCancel>
              <Button disabled={loadingDelete} onClick={() => {
                setLoadingDelete(true)
                deleteAccounts()
              }}>{loadingDelete ? <div className="flex items-center gap-1"><Loader2 className="animate-spin w-4 h-4"/> {lang?.loading}</div> : lang?.continue}</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.title}</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="flex justify-between mt-8 max-sm:flex-col max-sm:gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="email@email.com"
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link href="/accounts/add"><Button className="max-sm:w-full"><Plus className="h-4 mr-1"/>{lang?.add_accounts}</Button></Link>
            </div>
            {data?.data?.length == 0 && !loadingAccounts ? <div className="flex gap-2 items-center mt-2"><SearchX /> {lang?.not}</div> : null}
            {loadingAccounts ? <div className="flex gap-2 items-center mt-4"><Loader2 className="animate-spin w-5 h-5"/>{lang?.downloading_accounts}</div> : data?.data?.length == 0 && !loadingAccounts ? null :
              <div className="w-full mt-5">
                <div className="flex justify-between items-center mb-3 h-[34px]">
                  <div className="text-sm text-muted-foreground">{selected.length} {lang?.highlighted}</div>
                  {selected.length > 0 ? <Button variant="destructive" onClick={() => setOpenDelete(true)} className="h-[34px]">{lang?.delete}</Button> : null}
                </div>
                <div className="rounded-md border max-sm:overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]"><Checkbox name="all" checked={selectedAll} onClick={(value) => handleSelectedAll(!selectedAll)} /></TableHead>
                        <TableHead className="max-lg:hidden">ID</TableHead>
                        <TableHead>{lang?.email}</TableHead>
                        <TableHead className="text-right max-sm:hidden">{lang?.action}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.data?.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Checkbox name={item.id} checked={selected.includes(item.id)} onCheckedChange={(value) => handleSelect(value, item.id)}/>
                          </TableCell>
                          <TableCell className="max-lg:hidden max-sm:hidden">{item?.account_id}</TableCell>
                          <TableCell className="max-sm:text-xs">
                            {item?.email}
                            <DropdownMenu>
                              <DropdownMenuTrigger className="hidden max-sm:flex w-fit" asChild>
                                <div className="text-primary">{lang?.open_menu}</div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{lang?.actions}</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => navigator.clipboard.writeText(item.email)}
                                >
                                  {lang?.copy_email}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                  setIdView(item.id)
                                  setOpenView(true)
                                }}>{lang?.view}</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell className="text-right max-sm:hidden">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">{lang?.open_menu}</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{lang?.actions}</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => navigator.clipboard.writeText(item.email)}
                                >
                                  {lang?.copy_email}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                  setIdView(item.id)
                                  setOpenView(true)
                                }}>{lang?.view}</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              <div className="flex items-center justify-between mt-3 gap-3 max-sm:flex-col">
                <div className="flex whitespace-nowrap text-sm text-muted-foreground">{page} {lang?.of} {data.all_page} {lang?.rows_selected}.</div>
                <div className="flex gap-2">
                  <div onClick={() => paginate(1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
                    <ChevronsLeft className="w-[15px] h-[16px]"/>
                  </div>
                  <div onClick={() => paginate(page - 1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
                    <ChevronLeft className="w-[15px] h-[16px]"/>
                  </div>
                  <div onClick={() => paginate(page + 1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
                    <ChevronRight className="w-[15px] h-[16px]"/>
                  </div>
                  <div onClick={() => paginate(data.all_page)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
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
