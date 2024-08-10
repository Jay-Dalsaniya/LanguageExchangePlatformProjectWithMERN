import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedCourseTable = () => {
    const { allAppliedCourses } = useSelector(store => store.course);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied courses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Course Role</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedCourses.length <= 0 ? <span>You haven't applied to any course yet.</span> : allAppliedCourses.map((appliedCourse) => (
                            <TableRow key={appliedCourse._id}>
                                <TableCell>{appliedCourse?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedCourse.course?.title}</TableCell>
                                <TableCell>{appliedCourse.course?.language?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedCourse?.status === "rejected" ? 'bg-red-400' : appliedCourse.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedCourse.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedCourseTable
