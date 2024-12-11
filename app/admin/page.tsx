'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserByEmail } from '@/utils/db/actions'
import { 
  Users as UsersIcon, 
  FileText, 
  Gift, 
  Trash2, 
  Bell, 
  Coins
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

type TableName = 'users' | 'reports' | 'rewards' | 'collected_wastes' | 'notifications' | 'transactions'

interface TableConfig {
  icon: React.ElementType
  label: string
  columns: string[]
}

interface TableData {
  id: number
  [key: string]: unknown
}

const TABLE_CONFIGS: Record<TableName, TableConfig> = {
  users: {
    icon: UsersIcon,
    label: 'Users',
    columns: ['id', 'email', 'name', 'createAt']
  },
  reports: {
    icon: FileText,
    label: 'Reports',
    columns: ['id', 'location', 'wasteType', 'status', 'createAt']
  },
  rewards: {
    icon: Gift,
    label: 'Rewards',
    columns: ['id', 'userId', 'points', 'level', 'createAt']
  },
  collected_wastes: {
    icon: Trash2,
    label: 'Collected Wastes',
    columns: ['id', 'reportId', 'status', 'collectionDate']
  },
  notifications: {
    icon: Bell,
    label: 'Notifications',
    columns: ['id', 'message', 'type', 'createAt']
  },
  transactions: {
    icon: Coins,
    label: 'Transactions',
    columns: ['id', 'userId', 'type', 'amount', 'description', 'createAt']
  }
}

export default function AdminPage() {
  const [tableData, setTableData] = useState<TableData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTable, setSelectedTable] = useState<TableName>('users')

  const fetchTableData = async (tableName: TableName) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/${tableName}`)
      const data = await response.json()
      setTableData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTableData(selectedTable)
  }, [selectedTable])

  // Rest of your component code...
} 