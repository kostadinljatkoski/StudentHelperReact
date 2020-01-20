import React, {Component} from "react";
import Filters from '../Courses/Filters/Filters';
import Container from '../Courses/Container/Container';
import Pagination from '../Courses/Pagination/Pagination';
import CoursesService from "../../repository/coursesRepository";

class MainContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            courses : [],
            pagination : {
                PageNumber : 0,
                PageSize : 6,
                TotalPages : 0,
                TotalRecords : 0
            },
            cardView : true
        }
    }

    componentDidMount() {
        this.loadCourses();
    }

    loadCourses = (pageNumber = 0, params = null, pageSize= this.state.pagination.PageSize) => {
        CoursesService.fetchCoursesPaged(pageNumber, pageSize, params).then(response => {
            console.log(response);
            this.setState({
                courses : response.data.Results,
                pagination : {
                    PageNumber : response.data.PageNumber - 1,
                    PageSize : response.data.PageSize,
                    TotalPages : response.data.TotalPages,
                    TotalRecords : response.data.TotalRecords
                }
            });
        });
    };

    pageChanged = (pageNumber, params) => {
        this.loadCourses(pageNumber, params);
    };

    applyFilters = params => {
      this.loadCourses(0, params);
    };

    viewChanged = cardView => {
        this.setState({cardView: cardView});
    };

    pageSizeChanged = (pageSize, params) => {
      this.loadCourses(0, params, pageSize);
    };



    render() {
        return (
            <div className="mt-5 container-fluid px-5">
                <div className="row">
                    <Filters
                        applyFilters={this.applyFilters}
                        resetFilters={this.loadCourses}/>
                    <Container courses={this.state.courses}
                               cardView={this.state.cardView}
                               changeView={this.viewChanged}
                               pageSize={this.state.pagination.PageSize}
                               changePageSize={this.pageSizeChanged}
                               totalPages={this.state.pagination.TotalPages}/>
                    <div className="offset-3 col-9 mb-5">
                        <Pagination
                            pageNumber={this.state.pagination.PageNumber}
                            pageSize={this.state.pagination.PageSize}
                            totalPages={this.state.pagination.TotalPages}
                            onPageChange={this.pageChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;