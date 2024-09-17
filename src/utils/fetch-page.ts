// Function to fetch paginated data from a model
export async function fetchPage(
  model: any, // Mongoose model to query
  {
    filter = {}, // Filter conditions to apply to the query
    pagination = { count: 10, page: 1 }, // Pagination settings (items per page and current page)
    order = { updatedAt: -1 }, // Sorting order (e.g., by updatedAt field in descending order)
    trx = null, // Optional session for transaction support
    select, // Optional fields to include in the results
    exclude, // Optional fields to exclude from the results
  }: IPaginationPayload // Destructured pagination payload
): Promise<IPaginationResponse> {
  // Destructure pagination settings
  const { count: perPage, page: currentPage } = pagination;
  // Calculate the number of documents to skip based on the current page
  const skip = (currentPage - 1) * perPage;

  // Build the query with filter, pagination, sorting, and transaction session
  let query = model
    .find({ ...filter })
    .skip(skip)
    .limit(perPage)
    .sort({ ...order })
    .session(trx);

  // If 'select' is provided, include only the specified fields
  if (select) {
    query = query.select(select);
  }

  // If 'exclude' is provided, exclude the specified fields from the results
  if (exclude) {
    const excludeFields = exclude.reduce((acc: any, field: string) => {
      acc[field] = 0; // Mongoose uses 0 to exclude fields
      return acc;
    }, {});
    query = query.select(excludeFields);
  }

  // Execute the query and count the total number of documents matching the filter
  const [documents, totalDocuments] = await Promise.all([
    query.session(trx).exec(), // Fetch documents
    model.countDocuments({ ...filter }).session(trx), // Count total documents
  ]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalDocuments / perPage);

  // Return the results along with pagination metadata
  return {
    documents,
    meta: {
      currentPage,
      perPage,
      totalDocuments,
      totalPages,
    },
  };
}

// Interface for pagination settings
interface IPagination {
  count: number; // Number of items per page
  page: number; // Current page number
}

// Interface for pagination metadata
export interface IMeta {
  currentPage: number; // Current page number
  perPage: number; // Number of items per page
  totalDocuments: number; // Total number of documents
  totalPages: number; // Total number of pages
}

// Interface for pagination payload
export interface IPaginationPayload {
  filter?: any; // Filter conditions for the query
  pagination?: IPagination; // Pagination settings
  populates?: { path: string; select: string; populate?: any; match?: any }[]; // Optional populate settings
  order?: any; // Sorting order
  trx?: any; // Optional transaction session
  select?: string; // Optional fields to include in the results
  exclude?: string[]; // Optional fields to exclude from the results
}

// Interface for the response containing documents
export interface IResponse {
  documents: any; // Documents fetched from the query
}

// Interface for the full pagination response
export interface IPaginationResponse {
  documents: any; // Documents fetched from the query
  meta: IMeta; // Metadata about the pagination
}

// Interface for model statics with the fetchPage method
export interface ModelStatics {
  fetchPage: (T: IPaginationPayload) => Promise<IPaginationResponse>; // Method to fetch paginated data
}
