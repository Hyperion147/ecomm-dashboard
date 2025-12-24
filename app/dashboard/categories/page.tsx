import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/data";
import {
  Grid,
  Plus,
  MoreVertical,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CategoriesPage() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product catalog structure.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories
          .filter((c) => !c.parentId)
          .map((parent) => (
            <Card key={parent.id} className="group overflow-hidden">
              <CardHeader className="relative h-32 p-0">
                <img
                  src={parent.image}
                  alt={parent.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    {parent.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {parent.description}
                  </p>
                  <Badge variant={parent.isActive ? "default" : "secondary"}>
                    {parent.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Subcategories
                  </p>
                  {categories
                    .filter((c) => c.parentId === parent.id)
                    .map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent group/item transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-muted overflow-hidden">
                            <img
                              src={child.image}
                              alt={child.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {child.name}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  {categories.filter((c) => c.parentId === parent.id).length ===
                    0 && (
                    <p className="text-xs text-muted-foreground italic p-2">
                      No subcategories
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded border overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {category.slug}
                  </TableCell>
                  <TableCell>
                    {category.parentId ? (
                      <Badge variant="outline">
                        {
                          categories.find((c) => c.id === category.parentId)
                            ?.name
                        }
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={category.isActive ? "default" : "secondary"}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
