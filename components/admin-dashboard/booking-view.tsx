// import { Eye, MapPin, MoreVertical, Plus } from "lucide-react";

// const BookingsManagement = ({ bookings }) => {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
//           <p className="text-muted-foreground mt-1">View and manage all bookings</p>
//         </div>
//         <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
//           <Plus className="mr-2 h-4 w-4" />
//           New Booking
//         </button>
//       </div>

//       <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//         <div className="p-6 pt-0">
//           <div className="relative w-full overflow-auto">
//             <table className="w-full caption-bottom text-sm">
//               <thead className="border-b">
//                 <tr className="border-b transition-colors hover:bg-muted/50">
//                   <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reference</th>
//                   <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
//                   <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Destination</th>
//                   <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Travel Date</th>
//                   <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Travelers</th>
//                   <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
//                   <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
//                   <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="[&_tr:last-child]:border-0">
//                 {bookings.map((booking:any) => (
//                   <tr key={booking.id} className="border-b transition-colors hover:bg-muted/50">
//                     <td className="p-4 align-middle">
//                       <div>
//                         <p className="text-sm font-medium">{booking.reference}</p>
//                         <p className="text-xs text-muted-foreground">{new Date(booking.created_at).toLocaleDateString()}</p>
//                       </div>
//                     </td>
//                     <td className="p-4 align-middle">
//                       <div>
//                         <p className="text-sm font-medium">{booking.user}</p>
//                         <p className="text-xs text-muted-foreground">{booking.email}</p>
//                       </div>
//                     </td>
//                     <td className="p-4 align-middle">
//                       <div className="flex items-center gap-2">
//                         <MapPin className="h-4 w-4 text-muted-foreground" />
//                         <span className="text-sm">{booking.destination}</span>
//                       </div>
//                     </td>
//                     <td className="p-4 align-middle text-sm">
//                       {new Date(booking.travel_date).toLocaleDateString()}
//                     </td>
//                     <td className="p-4 align-middle text-sm">{booking.travelers}</td>
//                     <td className="p-4 align-middle">
//                       <p className="text-sm font-semibold">UGX {booking.amount.toLocaleString()}</p>
//                     </td>
//                     <td className="p-4 align-middle">
//                       <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
//                         booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600' :
//                         booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
//                         'bg-red-500/10 text-red-600'
//                       }`}>
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td className="p-4 align-middle text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
//                           <Eye className="h-4 w-4" />
//                         </button>
//                         <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
//                           <MoreVertical className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };