export default interface CrudRepository<T> {
    get(page: number, param?: any): Promise<{data: T[], pages: number, total: number}>;
    save(entity: T, param?: any): Promise<T>;
    update(entity: T, param?: any): Promise<T>;
    delete(entity: T, param?: any): Promise<T>;
}